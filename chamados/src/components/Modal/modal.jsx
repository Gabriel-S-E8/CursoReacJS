import './modal.css';
import { FiX } from 'react-icons/fi';

export default function Modal({ content, close }) {
    return (
        <div className="modal">
            <div className="container">
                <button className="close" onClick={close}>
                    <FiX size={25} color="#fff" />
                    Voltar
                </button>

                <main>
                    <h2>Detalhes do chamado</h2>

                    <div className="row">
                        <span>
                            Cliente: <i>{content.cliente}</i>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Assunto: <i>{content.assunto}</i>
                        </span>
                        <span>
                            Cadastrado em: <i>{content.createdFormated}</i>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            status:{' '}
                            <i className='status-badge'
                                style={{
                                    color: '#FFF',
                                    backgroundColor:
                                        content.status === 'Aberto'
                                            ? '#5cb85c'
                                            : content.status === 'Concluido'
                                            ? '#999'
                                            : '#f0ad4e',
                                }}
                            >
                                {content.status}
                            </i>
                        </span>
                    </div>

                    {content.complemento !== '' && (
                        <>
                            <h3>Descrição</h3>
                            <p>{content.complemento}</p>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
