import { useState } from 'react'
import { TypeSelect } from '../../../../../components/utils/select'
import { TypeInput } from '../../../../../components/utils/input'
import { VisualDataWrapper, categories } from '../wrapper'
import VisualDataBarChart from '../bar-chart'
import { IBetPerformance } from '..'

const pointsPerSingleTip = 1.4

export const getInvestmentDetails = (
  monthlyInvestment: number,
  annualTnvestment: number,
  monthDetails: {
    win: number
    played: number
    month: string
  },
  betPerformance: IBetPerformance[]
) => {
  const investmentMonthlyPerGame = monthlyInvestment / monthDetails?.played
  const returnsExpectedMonthlyPerGame =
    investmentMonthlyPerGame * pointsPerSingleTip

  const anualPlayed = betPerformance.reduce((t, i) => {
    t += i.played
    return t
  }, 0)
  const anualWin = betPerformance.reduce((t, i) => {
    t += i.win
    return t
  }, 0)
  const investmentAnnualPerGame = annualTnvestment / anualPlayed
  const returnsExpectedAnnuallyPerGame =
    investmentAnnualPerGame * pointsPerSingleTip

  return {
    monthly: {
      returnsExpectedPerGame: (returnsExpectedMonthlyPerGame || 0).toFixed(2),
      totalReturns: (
        returnsExpectedMonthlyPerGame * (monthDetails?.win || 0)
      ).toFixed(2)
    },
    annually: {
      returnsExpectedPerGame: (returnsExpectedAnnuallyPerGame || 0).toFixed(2),
      totalReturns: (returnsExpectedAnnuallyPerGame * (anualWin || 0)).toFixed(
        2
      )
    }
  }
}

export const getDataSetValue = (
  monthDetails: {
    win: number
    played: number
    month: string
  },
  betPerformance: IBetPerformance[]
) => {
  const profit = (
    (parseFloat(
      getInvestmentDetails(1, 1, monthDetails, betPerformance)?.monthly
        .totalReturns
    ) || 0) - 1
  ).toFixed(2)
  return monthDetails.played > 0 ? ((parseFloat(profit) || 1) / 1) * 100 : 0
}

const ROI = ({
  betPerformance,
  isDefinition,
  isCalculator
}: {
  betPerformance: IBetPerformance[]
  isDefinition?: boolean
  isCalculator?: boolean
}) => {
  const [month, setMonth] = useState<string>('')
  const [investment, setInvestment] = useState<{
    monthly: number
    annually: number
  }>({ monthly: 0, annually: 0 })

  const selectMonth = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = target
    setMonth(value)
  }

  const handleInvestment = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    type: 'monthly' | 'annually'
  ) => {
    const { value } = target
    setInvestment({ ...investment, [type]: value ? parseFloat(value) : 0 })
  }

  const monthDetails = (() => {
    return betPerformance.filter((i) => i.month === month)?.[0]
  })()

  const monthData = [
    { title: 'Games Won', value: monthDetails?.win },
    { title: 'Total Games Played', value: monthDetails?.played },
    { title: 'Average Point per game', value: `${pointsPerSingleTip}` }
  ]

  const investmentDetails = getInvestmentDetails(
    investment.monthly,
    investment.annually,
    monthDetails,
    betPerformance
  )

  const defaultinvestmentDetails = getInvestmentDetails(
    1,
    1,
    monthDetails,
    betPerformance
  )

  const defaultProfit = (
    (parseFloat(defaultinvestmentDetails?.monthly.totalReturns) || 0) - 1
  ).toFixed(2)

  const roi = ((parseFloat(defaultProfit) || 1) / 1) * 100

  const chart = {
    caption: 'ROI',
    subcaption: 'Insights on ROI',
    xaxisname: 'Month',
    yaxisname: '',
    formatnumberscale: '1',
    plottooltext: '<b>$dataValue% $seriesName</b> in $label',
    theme: 'fusion',
    drawcrossline: '1'
  }

  const dataSet = [
    {
      seriesname: 'roi',
      data: betPerformance?.map((i) => ({
        value: getDataSetValue(i, betPerformance) + ''
      })) || [{ win: '0' }]
    }
  ]

  const danger = '#F26B6B'
  const success = '#00851D'

  const getROI = (gained: number, invested: number) => {
    return ((gained - invested) / invested) * 100
  }

  const monthlyInvestmentData = [
    {
      title: `ROI for ${month}`,
      value: `${
        investment.monthly
          ? getROI(
              parseFloat(investmentDetails?.monthly.totalReturns),
              investment.monthly
            ).toFixed(3)
          : roi
      } %`,
      color: roi < 0 ? danger : success
    },
    {
      title: 'Gains Expected Per Game',
      value: `$ ${investmentDetails?.monthly.returnsExpectedPerGame}`
    },
    {
      title: 'Total Money Gained',
      value: `$ ${investmentDetails?.monthly.totalReturns}`
    },
    {
      title: 'Profit',
      value: `$ ${(
        (parseFloat(investmentDetails?.monthly.totalReturns) || 0) -
        investment.monthly
      ).toFixed(2)}`,
      color: roi < 0 ? danger : success
    }
  ]

  const annualROI = dataSet?.[0]?.data.reduce((t, i) => {
    t += parseFloat(i.value)
    return t
  }, 0)

  const annualInvestmentData = [
    {
      title: `ROI for the year`,
      // value: `${annualROI} %`,
      value: `${
        investment.annually
          ? getROI(
              parseFloat(investmentDetails?.annually.totalReturns),
              investment.annually
            ).toFixed(3)
          : annualROI
      } %`,
      color: annualROI < 0 ? danger : success
    },
    // {
    //   title: 'Gains Expected Per Game',
    //   value: `$ ${investmentDetails?.annually.returnsExpectedPerGame}`
    // },
    {
      title: 'Total Money Gained',
      value: `$ ${investmentDetails?.annually.totalReturns}`
    },
    {
      title: 'Profit',
      value: `$ ${(
        (parseFloat(investmentDetails?.annually.totalReturns) || 0) -
        investment.annually
      ).toFixed(2)}`,
      color: annualROI < 0 ? danger : success
    }
  ]

  return (
    <div>
      <div className="text-center">
        {isDefinition && (
          <>
            <div className="text-left">
              <p className="mt-0">
                To calculate the Return on Investment (ROI) for a tipster,
                <br /> you need to know the total amount of money gained or lost
                by following the tipster&apos;s advice and the total amount of
                money invested in those tips.
              </p>
              <p className="text-small">
                The formula for calculating ROI is as follows:
                <br />
                <span className="text-little color-light">
                  ROI = ((Total Money Gained - Total Money Invested) / Total
                  Money Invested) * 100
                </span>
              </p>
            </div>
            <div className="w-100 border-bottom mt-4 mb-4" />
          </>
        )}
        {isCalculator && (
          <>
            <div className="text-left">
              <p>Use the ROI Calculator</p>
            </div>
            <div className="pt-3">
              <div className="grid-wrapper-px-250 gap-20">
                <div>
                  <TypeSelect
                    initoption={{ label: 'Select month', value: '' }}
                    optionsdata={betPerformance.map((i, index) => ({
                      id: index,
                      label: i.month,
                      value: i.month
                    }))}
                    onChange={selectMonth}
                    label="Month"
                    value={month}
                  />
                  {month ? <ResultComponent data={monthData} /> : null}
                </div>
                {month ? (
                  <div>
                    <TypeInput
                      label={`Investment in ${month} ($)`}
                      placeholder="Enter amount"
                      value={investment.monthly}
                      onChange={(e) => handleInvestment(e, 'monthly')}
                    />
                    <ResultComponent data={monthlyInvestmentData} />
                  </div>
                ) : null}
                {month ? (
                  <div>
                    <TypeInput
                      label={`Investment for the year ($)`}
                      placeholder="Enter amount"
                      value={investment.annually}
                      onChange={(e) => handleInvestment(e, 'annually')}
                    />
                    <ResultComponent data={annualInvestmentData} />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-100 border-bottom mt-2 mb-4" />
          </>
        )}
        <VisualDataWrapper>
          <VisualDataBarChart
            categories={[{ category: categories }]}
            dataset={dataSet}
            chart={chart}
          />
        </VisualDataWrapper>
      </div>
    </div>
  )
}

const ResultComponent = ({
  data
}: {
  data: Array<{ title: string; value: string | number; color?: string }>
}) => {
  return (
    <div className="text-left py-4">
      {data.map((i, index) => (
        <p className="mx-0 my-3 text-little f-row" key={index}>
          <span style={{ maxWidth: '200px' }} className="d-block w-100">
            {i.title}:
          </span>
          <b>
            <span style={{ color: i.color }}>{i.value}</span>
          </b>
        </p>
      ))}
    </div>
  )
}

export default ROI
