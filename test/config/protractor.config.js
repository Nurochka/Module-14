const path = require('path');
const yargs = require('yargs').argv;
const reporter = require('cucumber-html-reporter');

const reportOptions ={
  theme: 'bootstrap',
  jsonFile: path.join(__dirname, '../reports/report.json'),
  output: path.join(__dirname, '../reports/cucumber-report.html'),
  reportSuitsAsScenarios:true
}

exports.config = {
  allScriptsTimeout: 60000,
  getPageTimeout: 60000,
  specs: [path.resolve('./test/features/**/*.feature')],
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    shardTestFiles: yargs.instances > 1, // делить на потоки или нет; boolean
    maxInstances: yargs.instances || 1, //принимает кол-во потоков с консоли, если нет - по дефолту 1
    browserName: 'chrome',
    chromeOptions: {
      //args: ['--no-sandbox', '--window-size=1680,1050']
    },
  },
  disableChecks: true,
  directConnect: true,
  cucumberOpts: {
    require: [path.resolve('./test/step_definitions/**/*.js')],
    ignoreUncaughtExceptions: true,
    format: ['json:./test/reports/report.json', './node_modules/cucumber-pretty'],
    tags: yargs.tags || '@smoke'
  },
  onPrepare: () => {
    return browser.waitForAngularEnabled(false);    
  }, 

  afterLaunch: () => {
    return reporter.generate(reportOptions);
  }
};