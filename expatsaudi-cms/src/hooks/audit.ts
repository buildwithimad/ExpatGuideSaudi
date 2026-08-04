import type { CollectionBeforeChangeHook } from 'payload';

export const updateAuditFields: CollectionBeforeChangeHook = ({
  data,
  operation,
  req,
}) => {
  const userId = req.user?.id;

  if (operation === 'create' && userId) {
    data.createdBy = userId;
  }

  if (userId) {
    data.lastModifiedBy = userId;
  }

  return data;
};