const fastGlob = require("fast-glob");
const { createFileNode } = require("gatsby-source-filesystem/create-file-node");

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId },
  { name, patterns = `**`, path }
) => {
  const repoFiles = await fastGlob(patterns, {
    cwd: path,
    absolute: true,
  });

  const createAndProcessNode = (path) => {
    return createFileNode(path, createNodeId, {
      name: name,
      path: path,
    }).then((fileNode) => {
      return createNode(fileNode, {
        name: `gatsby-source-filesystem`,
      });
    });
  };

  return Promise.all(repoFiles.map(createAndProcessNode));
};

exports.onCreateNode;
