import { Schema, model } from 'mongoose';
import ITemplateTypeDocument from './interface';

export default model<ITemplateTypeDocument>(
  'TemplateType',
  new Schema(
    {
      name            : { type: String },
      description     : { type: String },

      isApprovable     : { type: Boolean },
      isReviewable     : { type: Boolean },
      isSubmittable    : { type: Boolean },
      isInputtable     : { type: Boolean },
      isViewable       : { type: Boolean },
      isReportable     : { type: Boolean }
    },
    { minimize: false, timestamps: true }
  )
);
