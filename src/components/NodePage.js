import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function(props) {
  function renderTitle() {
    if (props.node == null) return null;
    return <h1>{props.node.name}</h1>
  }

  function renderLinks() {
    if (props.node == null) return null;
    if (props.node.links && props.node.links.length > 0) {
      return (
        <div className="node-page__links">
          {props.node.links.map((link, index) => {
            return <a key={index} href={link.url} download={link.download}>{link.text}</a>
          })}
        </div>
      );
    }
    return null;
  }

  function renderDescription() {
    if (props.node == null) return null;
    return <div><ReactMarkdown className="node-page__content-description" source={props.node.description} escapeHtml={false} /></div>
  }

  return (
    <>
    <div className={`node-page ${props.node == null || props.isHidden ? 'hidden' : ''}`}>
      <div className="node-page__title">
        {renderTitle()}
      </div>
      <div className="node-page__content-container">
        <div className="node-page__content">
          {renderLinks()}
          {renderDescription()}
        </div>
      </div>
    </div>
    </>
  )
}
