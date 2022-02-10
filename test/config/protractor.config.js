const path = require('path');
const yargs = require('yargs').argv;
const reporter = require('cucumber-html-reporter');
const { logger } = require('./logger_config');
const cucumberJunitConvert = require('cucumber-junit-convert');

const reportOptions ={
  theme: 'bootstrap',
  jsonFile: path.join(__dirname, '../reports/report.json'),
  output: path.join(__dirname, '../reports/cucumber-report.html'),
  reportSuitsAsScenarios:true
}

const options = {
  inputJsonFile: path.join(__dirname, '../reports/report.json'),
  outputXmlFile: path.join(__dirname, '../reports/ci-report.xml'),
}

exports.config = {
  allScriptsTimeout: 200000,
  getPageTimeout: 200000,
  specs: [path.resolve('./test/features/*.feature')],
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    shardTestFiles: yargs.instances > 1, // делить на потоки или нет; boolean
    maxInstances: yargs.instances || 1, //принимает кол-во потоков с консоли, если нет - по дефолту 1
    browserName: 'chrome',
    chromeOptions: {
      args: ['--no-sandbox', '--window-size=1920,1080']
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
  onPrepare: async () => {
    logger.info('Disabling protractor sync');
    return await browser.waitForAngularEnabled(false);    
  }, 

  afterLaunch: () => {
    return reporter.generate(reportOptions) && cucumberJunitConvert.convert(options);
   }
};