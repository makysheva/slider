// eslint-disable-next-line no-var
declare var require: any;

function requireAll(requireContext: any) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('./', true, /^(?!.*(?:test.ts$)).*\.ts|.scss$/));
