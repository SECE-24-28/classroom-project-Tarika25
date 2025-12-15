const Loader = ({ size = 'md', text = 'Loading...', fullScreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const LoaderSpinner = () => (
    <div className="flex flex-col items-center gap-4">
      <div className={`${sizes[size]} border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin`} />
      {text && <p className="text-gray-600 font-medium">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <LoaderSpinner />
      </div>
    );
  }

  return <LoaderSpinner />;
};

export default Loader;