export default function TileSkeleton() {
  return (
    <div className='tile-wrapper'>
      <div className='tile-card'>
        <div className='tile-more-info'>
          <div>
            <div>
              <span className='tile-category-text'></span>
            </div>
          </div>
        </div>
        <div className='tile-image-wrapper'>
          <span className='post-image'>Loading</span>
        </div>

        <div className='tile-info-wrapper'>
          <div className='tile-info'>
            <div>
              <div className='tile-date'>
                <div>
                  <span className='tile-date-text'></span>
                </div>
              </div>
              <h3>Loading</h3>
              <p className='pt-1 pb-1'>Loading</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
