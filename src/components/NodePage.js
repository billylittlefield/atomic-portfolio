import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Lightbox from 'react-images';

export default function(props) {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function renderTitle() {
    if (props.node == null) return null;
    return (
      <div className="node-page__title">
        <h1>{props.node.title || props.node.name}</h1>
      </div>
    )
  }

  function handleClick(action, payload) {
    if (payload == null) {
      return;
    }
    if (action === 'selectNode') {
      props.selectNode(payload);
    }
  }

  function openImageViewer(index) {
    setCurrentImageIndex(index);
    setIsImageViewerOpen(true);
    setTimeout(() => document.getElementById('lightboxBackdrop').style.opacity = '1');
  }

  function closeImageViewer() {
    document.getElementById('lightboxBackdrop').style.opacity = '0';
    setTimeout(() => setIsImageViewerOpen(false), 300);
  }

  function renderImages() {
    if (!props.node || !props.node.images) return null;
    if (props.node.images.length > 0) {
      let images = props.node.images.map(({src}) => ({src}));
      return (
        <div className="node-page__images">
          {props.node.images.slice(0,4).map((image, key) => {
            return (
              <div key={key} className="image-container" onClick={() => openImageViewer(key)}>
                <div className="overlay"></div>
                <img style={image.style} src={image.src}/>
              </div>
            )
          })}
          <Lightbox
            images={images}
            currentImage={currentImageIndex}
            isOpen={isImageViewerOpen}
            backdropClosesModal={true}
            showThumbnails={true}
            onClickNext={() => setCurrentImageIndex((currentImageIndex + 1) % images.length)}
            onClickPrev={() => setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1)}
            onClickThumbnail={(key) => setCurrentImageIndex(key)}
            onClose={() => closeImageViewer()}
          />
        </div>
      )
    }
  }

  function renderLinks() {
    if (props.node == null) return null;
    if (props.node.links && props.node.links.length > 0) {
      return (
      <div className="node-page__links">
        {props.node.links.map((link, index) => {
          return <a onClick={handleClick.bind(this, link.action, link.payload)} key={index} href={link.url} download={link.download}>{link.text}</a>
        })}
      </div>
      );
    }
    return null;
  }

  function renderDescription() {
    if (props.node == null) return null;
    return (
      <div className="node-page__content">
        <ReactMarkdown className="node-page__content-description" source={props.node.description} escapeHtml={false} />
      </div>
    );
  }

  if (!props.node) {
    return null;
  } else {
    if (props.node.linksBelow) {
      return (
        <div className={`node-page ${props.isHidden ? 'hidden' : ''}`}>
          {renderTitle()}
          {renderImages()}
          {renderDescription()}
          {renderLinks()}
        </div>
      );
    } else {
      return (
        <div className={`node-page ${props.isHidden ? 'hidden' : ''}`}>
          {renderTitle()}
          {renderLinks()}
          {renderImages()}
          {renderDescription()}
        </div>
      );
    }
  }
}
