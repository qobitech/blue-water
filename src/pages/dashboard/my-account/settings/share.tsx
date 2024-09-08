import ResultTable from '../../../../components/table/ranking'
import { ICellAction } from '../../../../components/table/utils'

const ShareSettings = () => {
  const topRankData = [
    {
      id: '1',
      row: [
        {
          value: 'Email',
          isLink: false,
          url: ``,
          action: () => {}
        },
        {
          value: '0',
          isLink: false,
          url: ``,
          action: () => {}
        }
      ],
      rowActions: [
        {
          value: 'Add Credit',
          isLink: false,
          url: '',
          action: () => {}
        }
      ] as ICellAction[]
    },
    {
      id: '2',
      row: [
        {
          value: 'SMS',
          isLink: false,
          url: ``,
          action: () => {}
        },
        {
          value: '0',
          isLink: false,
          url: ``,
          action: () => {}
        }
      ],
      rowActions: [
        {
          value: 'Add Credit',
          isLink: false,
          url: '',
          action: () => {}
        }
      ] as ICellAction[]
    },
    {
      id: '3',
      row: [
        {
          value: 'Whatsapp',
          isLink: false,
          url: ``,
          action: () => {}
        },
        {
          value: '0',
          isLink: false,
          url: ``,
          action: () => {}
        }
      ],
      rowActions: [
        {
          value: 'Add Credit',
          isLink: false,
          url: '',
          action: () => {}
        }
      ] as ICellAction[]
    },
    {
      id: '4',
      row: [
        {
          value: 'Telegram',
          isLink: false,
          url: ``,
          action: () => {}
        },
        {
          value: '0',
          isLink: false,
          url: ``,
          action: () => {}
        }
      ],
      rowActions: [
        {
          value: 'Add Credit',
          isLink: false,
          url: '',
          action: () => {}
        }
      ] as ICellAction[]
    }
  ]
  return (
    <div className="w-100 px-3">
      <ResultTable
        ranking={true}
        hideNumbering
        header={['Title', 'Credit', 'Action']}
        currentPage={1}
        record={topRankData}
        cellWidth={100 / 2}
      />
    </div>
  )
}

export default ShareSettings
