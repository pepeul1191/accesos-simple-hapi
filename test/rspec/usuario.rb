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

#usuario_prueba
acceder