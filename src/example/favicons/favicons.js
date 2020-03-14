const faviconContext = require.context(
  '!!file-loader?name=favicons/[name].[ext]!.',
  true,
  /\.(svg|png|ico|xml|json)$/,
);

faviconContext.keys().forEach(faviconContext);
