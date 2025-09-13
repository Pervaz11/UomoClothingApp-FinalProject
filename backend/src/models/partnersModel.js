import mongoose from 'mongoose';
import partnerSchema from '../schemas/partnersSchema.js';

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;
