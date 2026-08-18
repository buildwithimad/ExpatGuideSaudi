import {
  generateSlug,
  updateAuditFields,
} from '@/hooks';


export const categoryBeforeValidate = [
  generateSlug('name'),
  
];

export const categoryBeforeChange = [
  updateAuditFields,
];