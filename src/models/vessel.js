import mongoose, { Schema } from 'mongoose';

const VesselSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    equipments: [{type: Schema.Types.ObjectId, ref: 'Equipment'}]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Vessel', VesselSchema);
