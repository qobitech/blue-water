export type tipsFilterValueType = 'all' | 'active' | 'ended'

export const multiplePredictionStatusEnum = {
  PUBLISHED: 'Published',
  PENDING: 'Pending',
  ARCHIVED: 'Archived'
} as const

export type multiplePredictionStatusType =
  (typeof multiplePredictionStatusEnum)[keyof typeof multiplePredictionStatusEnum]

export const multiplePredictionTableActionEnums = {
  PUBLISH: 'Publish',
  // DELETE: 'Delete',
  PPT: 'Add Pay Per Tip',
  DISCOUNT: 'Add Discount',
  REFERRAL: 'Add Referral Link',
  ARCHIVE: 'Archive'
}
