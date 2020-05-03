import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TextpubSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
      maxlength: 40,
    },
    model: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

mongoose.model('Textpub', TextpubSchema);
