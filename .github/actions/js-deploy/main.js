const core = require('@actions/core');
const exec = require('@actions/exec');

function run() {
  const bucketName = core.getInput('bucket', { required: true });
  const region = core.getInput('region', { required: true });
  const buildFolder = core.getInput('source', { required: true });

  const s3Uri = `s3://${bucketName}`;
  exec.exec(`aws s3 sync ${buildFolder} ${s3Uri} --region ${region}`)

  core.notice(`Files from ${buildFolder} have been synced to ${s3Uri} in region ${region}.`);

  const webURL = `http://${bucketName}.s3-website-${region}.amazonaws.com`;
  core.setOutput('web-url', webURL);
}

run();

