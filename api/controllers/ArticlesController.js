/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async list(req, res) {
    try {
      const results = await Articles.find();
      return res.view("pages/list", { articles: results });
    } catch (error) {
      return res.serverError(error);
    }
  },

  async create(req, res) {
    try {
      let { title, body } = req.body;
      if (!title) {
        return res.badRequest({ error: "Title is required!" });
      }

      const results = await Articles.create({ title, body });
      return res.redirect("/articles/list");
    } catch (error) {
      return res.serverError(error);
    }
  },

  async findOne(req, res) {
    try {
      let id = req.params.id;
      const results = await Articles.findOne({ id });
      return res.view("pages/edit", { article: results });
    } catch (error) {
      return res.serverError(error);
    }
  },

  async update(req, res) {
    try {
      let { title, body } = req.body;
      const results = await Articles.update(
        { id: req.params.id },
        { title, body }
      );
      return res.redirect("/articles/list");
    } catch (error) {
      return res.serverError(error);
    }
  },

  async delete(req, res) {
    try {
      let id = req.params.id;
      const results = await Articles.destroy({ id });
      return res.redirect("/articles/list");
    } catch (error) {
      return res.serverError(error);
    }
  },
};
