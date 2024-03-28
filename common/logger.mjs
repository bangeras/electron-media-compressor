import log from 'electron-log';

const Logger = () => {
    log.initialize();

    const info = (message) => {
        // console.log(message);
        log.info(message);
    };
    
    const error = (message) => {
        // console.error(message);
        log.error(message);
    };
    
    const warn = (message) => {
        // console.warn(message);
        log.warn(message);
    };

    return {
        info,
        error,
        warn
    };
};

const logger = Logger();

export {
    logger
};