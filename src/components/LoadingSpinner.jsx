function LoadingSpinner() {
  return (
    <>
      <div className="d-flex justify-content-center spinner-holder">
     <div className="spinner-border spinner" role="status" >
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
    </>
  );
}

export default LoadingSpinner;
