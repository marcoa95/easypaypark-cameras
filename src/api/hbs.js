const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const moment = require('moment');

class HBS {
  static templates = {};

  static async initHbs() {
    try {
      const template = await fs.promises.readFile(path.join(__dirname, 'templates', 'report.hbs'));
      HBS.templates.report = Handlebars.compile(template.toString());

      HBS.registerHelpers();
    } catch(err) {
      console.error(err);
    }
  }

  static registerHelpers() {
    Handlebars.registerHelper('formatDate', date => {
      return moment(date).format('DD/MM/YYYY, h:mm:ss a');
    });

    Handlebars.registerHelper('formatShortDate', date => {
      return moment(date).format('DD/MM/YYYY');
    });
  }

  static renderTemplate(templateName, content) {
    return HBS.templates[templateName](content);
  }
}

module.exports = HBS;
