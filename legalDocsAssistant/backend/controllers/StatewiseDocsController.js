import StatewiseDocs from '../models/StatewiseDocs;'
import Question from '../models/Question';

export const getQuestionsList = async (req, res) => {
  const { state, doctype } = req.query;
  try {
    const docs = await StatewiseDocs.findOne({ state, doctype });
    if (!docs) return res.status(404).send('Documents not found');

    const questions = await Promise.all(docs.arraylist.map(async (item) => {
      const question = await Question.findOne({ questionIndex: item });
      return question ? question.question : null;
    }));

    res.json({ questions: questions.filter(Boolean) }); // Filter out any null values
  } catch (error) {
    res.status(500).send(error.message);
  }
};
