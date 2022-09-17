const showdown = require("showdown");

const OPTIONS = {
    emoji: true,
    metadata: true,
    stikethrough: true,
    underline: true,
    headerLevelStart: 3,
};

/**
 * @typedef {object} MdlibConverter
 *
 * @property {import("showdown").Converter} _converter
 * @property {(string) => { html: string, metadata: object }} makeHtml
 */

/**
 *
 * @returns {MdlibConverter}
 */
const Mdlib = (options = {}) => {
    const _converter = new showdown.Converter({
        ...OPTIONS,
        ...options
    });

    const makeError = (missingProperties) => {
        return Error("Metadata doesn't contain valid metadata properties", {
            metadataProperties: missingProperties,
        })
    }

    return {
        _converter,
        makeHtml: (mdString) => {
            const html = _converter.makeHtml(mdString);
            const metadata = _converter.getMetadata();
            const expectedMetadata = ['title', 'category', 'tags', 'id'];

            if (typeof metadata !== "object")
                throw makeError(expectedMetadata);

            // Filter missing metadata
            const missingMetadata
                = expectedMetadata.filter(
                    (metadataKey) =>
                        !metadata.hasOwnProperty(metadataKey)
                );

            if (missingMetadata.length > 0)
                throw makeError(missingMetadata);

            // Convert a string of tags to an array
            metadata['tags'] = metadata
                .tags.split(",")
                .map(tag => tag.trim());

            return {
                html,
                metadata,
            }
        },
    };
};

module.exports = Mdlib;
