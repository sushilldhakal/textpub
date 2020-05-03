import mongoose from 'mongoose';

const Textpub = mongoose.model('Textpub');

const findOneByUrl = (url) =>
  new Promise((resolve, reject) => {
    Textpub.findOne({ url })
      .then((textpub) => {
        resolve(textpub || { createdAt: new Date() });
      })
      .catch((err) => reject(err));
  });

const removeOne = (url) =>
  new Promise((resolve, reject) => {
    Textpub.deleteOne({ url }, (err) => {
      if (err) return reject(err);
      return resolve({ message: 'Cleared page' });
    });
  });

const updateOne = (url, { title, model }) => {
  if (!model && !title) {
    return removeOne(url);
  }
  return new Promise((resolve, reject) => {
    Textpub.findOne({ url })
      .then((textpub) => {
        if (!textpub) {
          textpub = new Textpub({ url, title, model });
        } else {
          if (title) textpub.title = title;
          if (model) textpub.model = model;
        }
        return textpub.save();
      })
      .then(() => resolve({ message: 'Saved' }))
      .catch((err) => reject(err));
  });
};

export default {
  findOneByUrl,
  updateOne,
};
