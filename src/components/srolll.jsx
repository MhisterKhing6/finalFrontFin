const Scroll = ({ images, speed }) => {
    return (
      <div className="inner">
        <div className="wrapper">
          <section className="sectionScroll" style={{ "--speed": `${speed}ms` }}>
            {images.map(({src, name }) => (
              <div className="src" key={src}>
              <div className="d-flex align-items-center mx-2" >
              <img className="imgScroll" src={src} alt={name}  />
              <h3>{name}</h3>
              </div>
            </div>
            ))}
          </section>
          <section  className="sectionScroll" style={{ "--speed": `${speed}ms` }}>
            {images.map(({ src, name }) => (
              <div className="src" key={src}>
                <div className="d-flex align-items-center mx-2" >
                <img className="imgScroll" src={src} alt={name}  />
                <h3>{name}</h3>
                </div>
              </div>
            ))}
          </section>
          <section className="sectionScroll" style={{ "--speed": `${speed}ms` }}>
            {images.map(({ src, name }) => (
              <div className="src" key={src}>
              <div className="d-flex align-items-center mx-2" >
              <img className="imgScroll" src={src} alt={name}  />
              <h3>{name}</h3>
              </div>
            </div>
            ))}
          </section>
        </div>
      </div>
    );
  };
  
  export { Scroll };
  