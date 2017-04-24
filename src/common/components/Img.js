import React, { Component, PropTypes } from 'react';
import { common } from 'common';

export default function Img({ ...props }) {
  return <img {...props} src={`${common.IMAGE_DOMAIN}${props.src}`} />
}
