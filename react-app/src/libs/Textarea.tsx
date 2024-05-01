import { VFC, useState, ChangeEvent } from "react";
import styled, { css } from "styled-components";
import { fontSize, space, radius, color } from "./constants";

type Props = {
  width?: number;
  maxLength?: number;
};

export const Textarea: VFC<Props> = ({ maxLength, width = 300 }) => {
  const [count, setCount] = useState<number>(0);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCount(event.currentTarget.value.length);
  };
  const isError = (): boolean => {
    if (maxLength !== undefined && maxLength - count < 0) return true;
    return false;
  };
  return (
    <>
      <Wrapper width={width} onChange={handleChange}></Wrapper>
      {maxLength !== undefined && (
        <Count className={isError() ? "error" : ""}>
          残り{Math.max(maxLength - count, 0)}文字です
        </Count>
      )}
    </>
  );
};

const Wrapper = styled.textarea<{ width: number }>`
  height: 120px;
  padding: ${space.m};
  border-radius: ${radius.m};
  border: solid 1px ${fontSize.m};
  font-size: ${fontSize.m};
  ${(props) =>
    css`
      width: ${props.width}px;
    `}
`;

const Count = styled.p`
  margin: 0;
  font-size: ${fontSize.m};
  &.error {
    color: ${color.red};
  }
`;
