// import { useEffect, useState } from 'react'
// import { TypeSelect } from '../../../components/utils/select'
// import { TypeSmallButton } from '../../../components/utils/button'
// import { TypeInput } from '../../../components/utils/input'
// import { useFormHook } from '../../../components/utils/hooks'
// import * as yup from 'yup'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { typeAction } from './data'
// import { IMemberSubscriptionService } from '../../../interface/IOther'
// import { TypeCheckbox } from '../../../components/utils/checkbox'
// import { TypeTextArea } from '../../../components/utils/text-area'
// import { IMembershipSubscription } from '../../../interface/ISubscription'
// import DefaultTable, {
//   IDefaultTableRecord
// } from '../../../components/table/default'
// import { getUserRole, typeRoleId } from '../../../constants/global'
// import {
//   useMemberService,
//   useMembershipPlan,
//   useMemberships
// } from '../../../api/membership'
// import {
//   // ResponseComponent,
//   apiFeatures
//   // getResponse
// } from '../../../api'
// import { roleIdEnum } from '../../auth/register/data'

// const serviceSchema = {
//   title: yup.string().required('title is required'),
//   amount: yup.string().required('amount is required'),
//   quantity: yup.string().required('amount is required')
// }

// const mspSchema = {
//   role: yup.string().required('Role is required'),
//   membershipId: yup.string().required('Membership is required'),
//   membership: yup.string(),
//   description: yup.string().required('Description is required'),
//   services: yup.array().of(yup.string().required('Services is required'))
// }

// const roleOptions = [
//   {
//     id: '1',
//     label: 'Buyer',
//     value: roleIdEnum.BUYER
//   },
//   {
//     id: '2',
//     label: 'Seller',
//     value: roleIdEnum.SELLER
//   }
// ]

// const statusGroup = [
//   {
//     id: '1',
//     label: 'Inactive',
//     value: 'Inactive'
//   },
//   {
//     id: '2',
//     label: 'Active',
//     value: 'Active'
//   }
// ]

// interface IService {
//   service: string
//   amount: string
//   quantity: string
// }

// const SubscriptionSetting = () => {
//   const [mspHookForm] = useFormHook<{
//     role: string
//     membership: string
//     membershipId: string
//     services: Array<{ service: string; amount: string; quantity: string }>
//     description: string
//   }>(mspSchema)

//   const queryClient = useQueryClient()
//   const [actionType, setActionType] = useState<typeAction>(null)
//   const [selectedPlan, setSelectedPlan] = useState<
//     IMembershipSubscription | undefined
//   >(undefined)

//   const onAddServiceItem = (data: {
//     service: string
//     amount: string
//     quantity: string
//   }) => {
//     const services = mspHookForm.watch('services') || []
//     services.push(data)
//     mspHookForm.setValue('services', services)
//   }

//   const onModifyServiceItem = (data: {
//     service: string
//     amount: string
//     quantity: string
//   }) => {
//     const services = mspHookForm.watch('services') || []
//     const index = services.map((j) => j?.service).indexOf(data?.service || '')
//     services[index] = { ...data }
//     mspHookForm.setValue('services', services)
//   }

//   const onRemoveServiceItem = (i: IMemberSubscriptionService) => {
//     const services = mspHookForm.watch('services') || []
//     const index = services.map((j) => j?.service).indexOf(i?.title || '')
//     services.splice(index, 1)
//     mspHookForm.setValue('services', services)
//   }

//   const getTotalAmount = (): number => {
//     const services = mspHookForm.watch('services') || []
//     const total = services.reduce<number>((t, i) => {
//       t += i?.amount ? parseInt(i.amount) : 0
//       return t
//     }, 0)
//     return total || 0
//   }

//   const { data: memberSubService } = useMemberService()

//   const { data: allMembers } = useMemberships()

//   const { data: allMembersSubscriptionPlans } = useMembershipPlan()

//   const members = allMembers?.data.memberships
//   const memberSubscriptionServices =
//     memberSubService?.data.memberSubscriptionServices
//   const plans = allMembersSubscriptionPlans?.data.memberSubscriptions

//   const getActionRequest = async (req: any) => {
//     switch (actionType) {
//       case 'create':
//         return await apiFeatures.post('member-subscription', req)
//       case 'update':
//         return await apiFeatures.put('member-subscription', req.id, req)
//       default:
//         return (() => {})()
//     }
//   }

//   const {
//     mutate,
//     isLoading
//     // error, data
//   } = useMutation({
//     mutationFn: async (req: any) => await getActionRequest(req),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries(['all-member-subscription-plans'])
//     }
//   })

//   const handleAction = () => {
//     if (actionType === 'create')
//       mutate({
//         ...mspHookForm.watch(),
//         membershipId: mspHookForm.watch('membership'),
//         membership: members?.filter(
//           (i) => i._id === mspHookForm.watch('membership')
//         )?.[0]?.title,
//         amount: getTotalAmount()
//       })
//     if (actionType === 'update')
//       mutate({
//         ...mspHookForm.watch(),
//         membershipId: mspHookForm.watch('membership'),
//         membership: members?.filter(
//           (i) => i._id === mspHookForm.watch('membership')
//         )?.[0]?.title,
//         amount: getTotalAmount(),
//         payment_plan: selectedPlan?.payment_plan,
//         id: selectedPlan?._id,
//         status: selectedPlan?.status
//       })
//   }

//   // const response = getResponse(data, error)

//   const updateForm = (plan?: IMembershipSubscription) => {
//     mspHookForm.setValue('role', plan?.role || '')
//     mspHookForm.setValue('description', plan?.description || '')
//     mspHookForm.setValue('membership', plan?.membership?.[0]?._id || '')
//     mspHookForm.setValue(
//       'services',
//       plan?.services.map((i) => {
//         const { _id, ...rest } = i
//         return { ...rest }
//       }) || []
//     )
//     setSelectedPlan(plan)
//   }

//   if (actionType === 'create' || actionType === 'update')
//     return (
//       <div className="admin-setting-membership">
//         <div className="admin-setting-membership-select-add">
//           <TypeSelect
//             initoption={{ label: 'Select role', value: '' }}
//             optionsdata={roleOptions}
//             customwidth={'100%'}
//             {...mspHookForm.register('role')}
//             error={mspHookForm.formState.errors.role?.message}
//             label="Role"
//           />
//         </div>
//         <div className="admin-setting-membership-select-add mb-2">
//           <TypeSelect
//             initoption={{ label: 'Select membership', value: '' }}
//             customwidth={'100%'}
//             {...mspHookForm.register('membership')}
//             optionsdata={members?.map((i) => ({
//               id: i._id,
//               label: i.title,
//               value: i._id
//             }))}
//             error={mspHookForm.formState.errors.membership?.message}
//             label="Membership"
//           />
//         </div>
//         <TypeTextArea
//           placeholder="Enter description"
//           {...mspHookForm.register('description')}
//           error={mspHookForm.formState.errors.description?.message}
//           label="Description"
//         />
//         {actionType === 'update' ? (
//           <div className="admin-setting-membership-select-add mb-4">
//             <TypeSelect
//               initoption={{ label: 'Select status', value: '' }}
//               customwidth={'100%'}
//               optionsdata={statusGroup}
//               onChange={({ target }) => {
//                 const { value } = target
//                 setSelectedPlan((e) => {
//                   if (e)
//                     return {
//                       ...e,
//                       status: value as 'Inactive' | 'Active'
//                     }
//                   return undefined
//                 })
//               }}
//               value={selectedPlan?.status}
//               label="Status"
//             />
//           </div>
//         ) : null}
//         <form
//           className="admin-setting-membership-form"
//           onSubmit={(e) => e.preventDefault()}
//         >
//           <div className="text-center">
//             <p className="m-0 color-light">Add Services</p>
//           </div>
//           {memberSubscriptionServices
//             ?.filter((i) => i.status === 'Active')
//             .map((i, index) => (
//               <ServiceItem
//                 key={index}
//                 data={i}
//                 type={actionType}
//                 amount={mspHookForm.watch('services')?.[index]?.amount || ''}
//                 quantity={
//                   mspHookForm.watch('services')?.[index]?.quantity || ''
//                 }
//                 title={mspHookForm.watch('services')?.[index]?.service || ''}
//                 onAddServiceItem={onAddServiceItem}
//                 onRemoveServiceItem={() => {
//                   onRemoveServiceItem(i)
//                 }}
//                 onModifyServiceItem={onModifyServiceItem}
//               />
//             ))}
//           <div className="border-top mt-3 pt-3 pb-1 f-row aic jcsb">
//             <p className="m-0">
//               <b>Total</b>
//             </p>
//             <p className="m-0">
//               <b>$ {getTotalAmount()}</b>
//             </p>
//           </div>
//         </form>

//         {/* <ResponseComponent response={response} /> */}

//         <div className="admin-setting-membership-cta mt-3">
//           <TypeSmallButton
//             title={actionType === 'create' ? 'Save' : 'Update'}
//             onClick={handleAction}
//             load={isLoading}
//           />
//           <TypeSmallButton
//             title="Cancel"
//             buttonType="danger"
//             onClick={() => {
//               setActionType(null)
//               updateForm()
//             }}
//           />
//         </div>
//       </div>
//     )

//   const tableRecord: IDefaultTableRecord[] = plans?.map((i) => ({
//     id: i._id,
//     row: [
//       {
//         value: i.membership?.[0]?.title || '',
//         isLink: false
//       },
//       {
//         value: getUserRole(i.role as typeRoleId),
//         isLink: false
//       },
//       {
//         value: i.amount || '0',
//         isLink: false
//       },
//       {
//         value: i.services.length + ' service(s)',
//         isLink: false
//       },
//       {
//         value: i.status,
//         isLink: false
//       }
//     ],
//     rowActions: [
//       {
//         value: 'Edit',
//         action: () => {
//           setActionType('update')
//           updateForm(i)
//         }
//       },
//       {
//         value: 'Delete',
//         action: () => {
//           setActionType('delete')
//         },
//         buttonType: 'danger'
//       }
//     ]
//   })) as IDefaultTableRecord[]

//   return (
//     <div className="admin-setting-membership">
//       <div className="pb-4">
//         <TypeSmallButton
//           title={`Add Membership Subscription Plan`}
//           buttonType="outlined"
//           onClick={() => {
//             setActionType('create')
//           }}
//         />
//       </div>
//       <div className="border rounded">
//         <div className="text-center mt-4 mb-4">
//           <p className="m-0">Payment Plans</p>
//         </div>
//         <div className="f-row aic mb-4 mt-2" style={{ overflow: 'auto' }}>
//           <DefaultTable
//             header={[
//               'MEMBERSHIP',
//               'ROLE',
//               'AMOUNT',
//               'SERVICES',
//               'STATUS',
//               'ACTION'
//             ]}
//             record={tableRecord}
//             hideNumbering
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// const ServiceItem = ({
//   data,
//   type,
//   onRemoveServiceItem,
//   onAddServiceItem,
//   onModifyServiceItem,
//   amount,
//   quantity,
//   title
// }: {
//   data: IMemberSubscriptionService
//   type: typeAction
//   onRemoveServiceItem?: () => void
//   onAddServiceItem?: (data: IService) => void
//   onModifyServiceItem?: (data: IService) => void
//   amount: string
//   quantity: string
//   title: string
// }) => {
//   const [serviceHookForm] = useFormHook<IService>(serviceSchema)

//   useEffect(() => {
//     if (type === 'update') {
//       serviceHookForm.setValue('service', title)
//       serviceHookForm.setValue('amount', amount)
//       serviceHookForm.setValue('quantity', quantity)
//     }
//   }, [])

//   return (
//     <div>
//       <div className="admin-setting-membership-select-items">
//         <div className="f-row-10 aic" style={{ width: '200px' }}>
//           <TypeCheckbox
//             checked={!!serviceHookForm.watch('service')}
//             onChange={({ target }) => {
//               const { checked } = target
//               if (checked) {
//                 onAddServiceItem?.({
//                   service: data._id,
//                   amount: serviceHookForm.watch('amount') || '',
//                   quantity: serviceHookForm.watch('quantity') || ''
//                 })
//                 serviceHookForm.setValue('service', data._id)
//               } else {
//                 serviceHookForm.setValue('service', '')
//                 serviceHookForm.setValue('amount', '')
//                 onRemoveServiceItem?.()
//               }
//             }}
//             value={serviceHookForm.watch('service')}
//           />
//           <p className="m-0">{data.title}</p>
//         </div>
//         <TypeInput
//           placeholder={!serviceHookForm.watch('service') ? '' : 'Enter Amount'}
//           customwidth={'100%'}
//           onChange={({ target }) => {
//             serviceHookForm.setValue('amount', target.value)
//             onModifyServiceItem?.({
//               service: data._id,
//               quantity: serviceHookForm.watch('quantity'),
//               amount: target.value
//             })
//           }}
//           value={serviceHookForm.watch('amount')}
//           isonlyview={!serviceHookForm.watch('service')}
//           error={serviceHookForm.formState.errors.amount?.message}
//         />
//         <TypeInput
//           placeholder={
//             !serviceHookForm.watch('service') ? '' : 'Enter Quantity'
//           }
//           customwidth={'100%'}
//           onChange={({ target }) => {
//             serviceHookForm.setValue('quantity', target.value)
//             onModifyServiceItem?.({
//               service: data._id,
//               amount: serviceHookForm.watch('amount'),
//               quantity: target.value
//             })
//           }}
//           value={serviceHookForm.watch('quantity')}
//           isonlyview={!serviceHookForm.watch('service')}
//           error={serviceHookForm.formState.errors.quantity?.message}
//         />
//       </div>
//     </div>
//   )
// }

// export default SubscriptionSetting
