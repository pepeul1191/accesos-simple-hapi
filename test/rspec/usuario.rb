# encoding: utf-8

require_relative 'app'
require 'json'

def usuario_prueba
  RSpec.describe App do
      describe "1. Crear usuario de prueba: " do
        it '1.1 Conexión con backend' do
          test =App.new('')
          test.servicios('backend', 'test/conexion')
          expect(test.response.code).to eq(200)
        end
        it '1.2 Crear usuario' do
            url = 'test/usuario_db'
            test =App.new(url)
            test.get()
            expect(test.response.code).to eq(200)
            expect(test.response.body).to eq('Se ha creado el usuario de prueba')
        end
      end
  end
end

def acceder
  RSpec.describe App do
    describe "2. Acceder al sistema: " do
      it '2.1 Conexión con backend' do
        test =App.new('')
        test.servicios('backend', 'test/conexion')
        expect(test.response.code).to eq(200)
      end
      it '2.2 Acceder' do
        url = 'usuario/acceder?usuario=pips&contrasenia=123'
        test =App.new(url)
        test.post()
        expect(test.response.code).to eq(200)
        expect(test.response.body).to eq('1')
      end
    end
  end
end

def nombre_repetido
  RSpec.describe App do
    describe "3. Validar nombre repetido: " do
      it '3.1 Conexión con backend' do
        test =App.new('')
        test.servicios('backend', 'test/conexion')
        expect(test.response.code).to eq(200)
      end
      it '3.2 Validar nombre repetido - es repetido' do
        data = {
          :id =>  'E',
          :usuario => 'pips',
        }.to_json
        url = 'usuario/nombre_repetido?data=' + data
        test =App.new(url)
        test.post()
        #puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).to eq('1')
      end
      it '3.3 Validar nombre repetido - no es repetido' do
        data = {
          :id =>  'E',
          :usuario => 'pips2',
        }.to_json
        url = 'usuario/nombre_repetido?data=' + data
        test =App.new(url)
        test.post()
        #puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).to eq('0')
      end
    end
  end
end

def correo_repetido
  RSpec.describe App do
    describe "4. Validar correo repetido: " do
      it '4.1 Conexión con backend' do
        test =App.new('')
        test.servicios('backend', 'test/conexion')
        expect(test.response.code).to eq(200)
      end
      it '4.2 Validar correo repetido - es repetido' do
        data = {
          :id =>  'E',
          :correo => 'pips@ulima.edu.pe',
        }.to_json
        url = 'usuario/correo_repetido?data=' + data
        test =App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).to eq('1')
      end
      it '4.3 Validar correo repetido - no es repetido' do
        data = {
          :id =>  'E',
          :correo => 'pips@ulima.edu.pex',
        }.to_json
        url = 'usuario/correo_repetido?data=' + data
        test =App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).to eq('0')
      end
    end
  end
end

#usuario_prueba
#acceder
#nombre_repetido
correo_repetido