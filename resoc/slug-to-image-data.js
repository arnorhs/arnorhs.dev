exports.slugToImageData = async (slug) => {
  return {
    // `${templates_dir}/${template}/resoc.manifest.json` should exist,
    // where templates_dir comes from netlify.toml and template is the parameter below
    template: 'default',

    values: {
      title: 'this is a test',
      color: 'rgb(92, 106, 196)',
    },
  }
}
