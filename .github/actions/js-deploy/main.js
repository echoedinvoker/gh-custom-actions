// const core = require('@actions/core');
// const exec = require('@actions/exec');
//
// function run() {
//   const bucketName = core.getInput('bucket', { required: true });
//   const region = core.getInput('region', { required: true });
//   const buildFolder = core.getInput('source', { required: true });
//
//   const s3Uri = `s3://${bucketName}`;
//   exec.exec(`aws s3 sync ${buildFolder} ${s3Uri} --region ${region}`)
//
//   core.notice(`Files from ${buildFolder} have been synced to ${s3Uri} in region ${region}.`);
//
//   const webURL = `http://${bucketName}.s3-website-${region}.amazonaws.com`;
//   core.setOutput('web-url', webURL);
// }
//
// run();
//
const { execSync } = require('child_process');

async function run() {
  try {
    // 從環境變數獲取參數
    const bucketName = process.env.INPUT_BUCKET;
    const region = process.env.INPUT_REGION;
    const buildFolder = process.env.INPUT_SOURCE;

    // 檢查必要參數
    if (!bucketName || !region || !buildFolder) {
      throw new Error('Missing required parameters: bucket, region, or source');
    }

    const s3Uri = `s3://${bucketName}`;
    
    // 執行 AWS CLI 命令
    const command = `aws s3 sync ${buildFolder} ${s3Uri} --region ${region}`;
    console.log(`Executing: ${command}`);
    
    execSync(command, { stdio: 'inherit' });

    console.log(`::notice::Files from ${buildFolder} have been synced to ${s3Uri} in region ${region}.`);

    // 設定 output (GitHub Actions 格式)
    const webURL = `http://${bucketName}.s3-website-${region}.amazonaws.com`;
    console.log(`::set-output name=web-url::${webURL}`);
    
  } catch (error) {
    console.error(`::error::${error.message}`);
    process.exit(1);
  }
}

run();
