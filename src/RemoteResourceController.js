const request = require('request-promise-native');
const clone = require('clone');

const { BaseDownloadController } = require('@razee/kapitan-core');


module.exports = class RemoteResourceController extends BaseDownloadController {
  constructor(params) {
    params.finalizerString = params.finalizerString || 'children.remoteresource.kapitan.razee.io';
    super(params);
  }

  async download(reqOpt) {
    this.log.debug(`Download ${reqOpt.uri || reqOpt.url}`);
    let opt = clone(reqOpt);
    opt.simple = false;
    opt.resolveWithFullResponse = true;

    // TODO capture etag and last-modified and save in controller to send with future calls.
    // Add to the request at .headers.If-Modified-Since/If-None-Match

    let res = await request(opt);
    if (res.statusCode !== 200) {
      this.log.debug(`Download ${res.statusCode} ${opt.uri || opt.url}`);
      return Promise.reject({ statusCode: res.statusCode, body: res.body });
    }
    this.log.debug(`Download ${res.statusCode} ${opt.uri || opt.url}`);
    return res;
  }


};
