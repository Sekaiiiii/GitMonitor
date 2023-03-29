/**
 * @file constant 
 */
const path = require('node:path');
const process = require('process');


const RESOURCE_DIR_NAME = 'app_resources';
const RESOURCE_DIR_PATH_CONTAINER = {
    RESOURCE_DIR_PATH: path.join(process.cwd(), RESOURCE_DIR_NAME)
};

const LOGGER_DIR_PATH = 'log'
const LOGGER_FILE_NAME = 'client.log';
const LOGGER_FILE_PATH = path.join(process.cwd(), RESOURCE_DIR_NAME, LOGGER_DIR_PATH, LOGGER_FILE_NAME);

if (process.env.NODE_ENV === 'dev') {
    RESOURCE_DIR_PATH_CONTAINER.RESOURCE_DIR_PATH = path.join(process.cwd(), '..');
}


const REPO_DIR_NAME = 'repo';
const REPO_DIR_PATH = path.join(RESOURCE_DIR_PATH_CONTAINER.RESOURCE_DIR_PATH, REPO_DIR_NAME);

const API_CODE = {
    SUCCESS: 0,
    FAILED: 1
};

module.exports = {
    RESOURCE_DIR_NAME,
    RESOURCE_DIR_PATH: RESOURCE_DIR_PATH_CONTAINER.RESOURCE_DIR_PATH,
    LOGGER_FILE_NAME,
    LOGGER_FILE_PATH,
    REPO_DIR_NAME,
    REPO_DIR_PATH,
    API_CODE
}