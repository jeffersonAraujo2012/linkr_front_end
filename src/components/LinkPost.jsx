import axios from "axios";
import { useEffect, useState } from "react";

import styled from "styled-components";

export default function LinkPost({ url }) {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      const data = await axios
        .get(process.env.REACT_APP_API_URL + "/utils/urls/metadata?url=" + url)
        .then((res) => res.data);
      setMetadata(data);
    };
    fetchMetadata();
  }, [url]);

  if (!metadata) return null;

  return (
    <LinkPostStyle linkImg={metadata.image} href={url} target="_blank">
      <div className="link_content">
        <h2>{metadata.title}</h2>
        <p>{metadata.description}</p>
        <p>{url}</p>
      </div>
      <div className="link_image" />
    </LinkPostStyle>
  );
}

const LinkPostStyle = styled.a`
  display: flex;
  align-items: stretch;

  width: 100%;
  min-height: 155px;

  border: 1px solid #4d4d4d;
  border-radius: 11px;

  text-decoration: none;

  .link_content {
    display: flex;
    flex-direction: column;
    padding: 24px 18px;
    word-break: break-word;
    h2 {
      margin-bottom: 5px;
      font-size: 16px;
      line-height: 19px;
      color: #cecece;
    }
    p {
      font-size: 11px;
      line-height: 13px;
    }
    p:nth-child(2) {
      margin-bottom: 5px;
      color: #9b9595;
    }
    p:nth-child(3) {
      margin-top: auto;
      color: #cecece;
    }
  }

  .link_image {
    flex-shrink: 0;
    width: 155px;

    background: url(${(props) => props.linkImg});
    background-size: cover;
    background-position: center;

    border-top-right-radius: 11px;
    border-bottom-right-radius: 11px;
  }
`;
