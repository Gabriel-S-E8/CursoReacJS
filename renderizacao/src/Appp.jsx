// Esse app seria utilizando as bibliotecas react-hook-form e zod.

import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './App.css'
import { Header } from './Header';

import { useForm } from 'react-hook-form';

const schema = z.object({
    name: z.string().min(1, 'Nome obrigatório'),
    email: z.string().min(1, 'Email obrigatório').email( 'Este formato não e valido'),
    username: z.string().min(1, 'Username obrigatorio'),
    description: z.string(),
    role: z.enum(['user', 'admin']),
});

function Appp () {
    const { register, handleSubmit, formState: { errors } } = useForm(
        {resolver: zodResolver(schema)}
    );

  function handleSave(data){
    console.log(data)

  }


  return (
    <div className="container">
      <h1>React</h1>
      <Header/>

      <form className="form" onSubmit={handleSubmit(handleSave)}>
        <input
          type="text"
          placeholder="Digite seu nome..."
          className="input"
          {...register('name')}
          id='name'
        />
        {errors.name && <p className='error'>{errors.name.message}</p>}

        <input
          type="text"
          placeholder="Digite seu email..."
          className="input"
          {...register('email')}
          id='email'
        />
        {errors.email && <p className='error'>{errors.email.message}</p>}

        <input
          type="text"
          placeholder="Digite seu username..."
          className="input"
          {...register('username')}
          id='username'
        />
        {errors.username && <p className='error'>{errors.username.message}</p>}

        <textarea
          type="text"
          placeholder="Digite sua descriçao..."
          className="input"
         {...register('description')}
          id='description'
        ></textarea>
        


        <select  
          className="select"
         {...register('role')}
          id='role'
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>


        <button className="button" type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default App
