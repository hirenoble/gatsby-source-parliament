# gatsby-source-parliament

Source plugin for pulling files into the Gatsby graph from local directory.

It sucks the files into the graph as `File` nodes based on defined patterns, as
if you'd configured
[`gatsby-source-filesystem`](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)
on that directory. As such, all the tranformer plugins that operate on files
should work exactly as they do with `gatsby-source-filesystem` eg with
`gatsby-transformer-remark`, `gatsby-transformer-json` etc.

N.B. Although with respect to sourcing this works as a drop-in replacement for `gatsby-source-filesystem`, there are a number of helpers included in that module (`createFilePath`, `createRemoteFileNode`, `createFileNodeFromBuffer`) that are not duplicated here – but you can still import and use them from there as needed.

## Install

`npm install --save @adobe/gatsby-source-parliament`

## Configuration

### Plugin options

- `name`: A machine name label for each plugin instance.
- `path`: The path to the local directory.
- `patterns` (optional): Passed to
  [fast-glob](https://github.com/mrmlnc/fast-glob) to determine which files get
  sucked into the graph.

### Example gatsby-config.js

```javascript
module.exports = {
  plugins: [
    // You can have multiple instances of this plugin to read source files from
    // different repositories or locations within a repository.
    {
      resolve: `gatsby-source-parliament`,
      options: {
        name: `external`,
        path: `path/to/local/directory`,
        // Only import the docs folder from a codebase.
        patterns: `docs/**`
      }
    }
  ]
};
```

This will result in `File` nodes being put in your data graph, it's then up to you to do whatever it is you want to do with that data.

## How to query

You can query file nodes exactly as you would node query for nodes created with
[`gatsby-source-filesystem`](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/),
eg:

```graphql
{
  allFile {
    edges {
      node {
        extension
        dir
        modifiedTime
      }
    }
  }
}
```

Similarly, you can filter by the `name` you specified in the config by using
`sourceInstanceName`:

```graphql
{
  allFile(filter: { sourceInstanceName: { eq: "external" } }) {
    edges {
      node {
        extension
        dir
        modifiedTime
      }
    }
  }
}
```

## Creating pages

If you want to programatically create pages on your site from the files in your git repo, you should be able to follow the standard examples, such as [part 7 of the Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-seven/) or [the standard docs page](https://www.gatsbyjs.org/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs).

### Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.