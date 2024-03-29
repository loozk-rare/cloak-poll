import { mq } from "@/styles/breakpoints";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  @media ${mq.sm.max} {
    gap: 0.75rem;
    flex-direction: column-reverse;
  }
`;

export const Links = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

const Link = styled.a`
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
  transition: color 0.15s ease-in-out;

  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 1);
    }
  }
`;

export function Footer() {
  return (
    <Wrapper>
      <Links>
        <Link href="https://github.com/brozorec" target="_blank">
          brozorec
        </Link>
        <Link href="https://twitter.com/CKobril" target="_blank">
          ckobril
        </Link>
        <Link href="https://github.com/DeveloperMarwan" target="_blank">
          DeveloperMarwan
        </Link>
        <Link href="https://github.com/eccentricexit" target="_blank">
          eccentricexit
        </Link>
        <Link href="https://github.com/upalchowdhury" target="_blank">
          upalchowdhury
        </Link>
      </Links>
    </Wrapper>
  );
}
