import mongoose, { Schema } from 'mongoose';

const EquipmentSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    vessel: {
      type: Schema.Types.ObjectId,
      ref: 'Vessel'
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Equipment', EquipmentSchema);
