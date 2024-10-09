import styled, {keyframes, css} from 'styled-components';


export const Container = styled.div`
    max-width: 700px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin: 80px auto;

    h1{
        font-size: 20px;
        display: flex;
        align-items: center;
        flex-direction: row;

        svg{
            margin-right: 8px;
        }
    }
`


export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input{
        flex: 1;
        border: 1px solid ${props => (props.error ? '#ff3333' : '#eee')};
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 18px;
    }

`

// criando animation do botão
const animate = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading
}))`
    background-color: #0d2636;
    border: 0;
    padding: 0px 15px;
    margin-left: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.4;
    }

    ${props => props.loading && 
        css`
            svg{
                animation: ${animate} 2s linear infinite;
            }
        `
    }
`

export const List = styled.ul`
  list-style:none;
  margin-top: 20px;

  li{
    padding: 15px 0;
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-between;

    & + li{
      border-top: 1px solid #414141;
    }

    a{
      color:#0D2636;
      text-decoration: none;
    }


  }

`;

export const DeleteButton = styled.button.attrs({
  type:'button'
})`
  background: transparent;
  color:#0D2636;
  border:0;
  padding: 8px 7px;
  outline:0;
  border-radius: 8px;
`;