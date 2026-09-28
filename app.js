import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';

export default function RotaCarMestre() {
  const [telaAtual, setTelaAtual] = useState('radar'); // 'radar', 'historico' ou 'admin'
  const [corridasAtuais] = useState(2); 

  // Configurações mestre controladas por você no painel
  const [precoKmConfig, setPrecoKmConfig] = useState('2.50');
  const [taxaFrotaConfig, setTaxaFrotaConfig] = useState('15');

  const [motoristasNoMapa] = useState([
    { id: 'admin', x: '25%', y: '35%', nome: 'VOCÊ (Admin)', corridas: 2 },
    { id: '2', x: '65%', y: '25%', nome: 'Carlos', corridas: 1 },
  ]);

  // Seus ganhos: Como criador logado no app mestre, sua taxa é 0% (Isento)
  const [ganhosAdmin] = useState([
    { id: '1', data: '27/09/2026', bruto: 31.50, taxaAplicada: '0% (Isento Admin)', liquido: '31.50', corridas: 1 },
    { id: '2', data: '26/09/2026', bruto: 52.00, taxaAplicada: '0% (Isento Admin)', liquido: '52.00', corridas: 2 },
  ]);

  if (telaAtual === 'admin') {
    return (
      <View style={estilos.container}>
        <View style={estilos.headerHistorico}>
          <Text style={estilos.logoTitulo}>⚙️ PAINEL MESTRE (ADMINISTRADOR)</Text>
        </View>
        <ScrollView style={{ padding: 20 }}>
          <View style={estilos.cardAdminBox}>
            <Text style={estilos.textoDourado}>💰 Alterar Preço por Km da Corrida</Text>
            <TextInput 
              style={estilos.inputAdmin} 
              keyboardType="numeric" 
              value={precoKmConfig} 
              onChangeText={setPrecoKmConfig} 
              placeholderTextColor="#666"
            />
            <Text style={estilos.textoCinza}>Valor atual aplicado nas chamadas: R$ {precoKmConfig} / km</Text>
          </View>

          <View style={estilos.cardAdminBox}>
            <Text style={estilos.textoDourado}>📊 Taxa Cobrada dos Motoristas da Frota (%)</Text>
            <TextInput 
              style={estilos.inputAdmin} 
              keyboardType="numeric" 
              value={taxaFrotaConfig} 
              onChangeText={setTaxaFrotaConfig} 
              placeholderTextColor="#666"
            />
            <Text style={estilos.textoCinza}>Comissão cobrada dos terceiros: {taxaFrotaConfig}%</Text>
          </View>

          <View style={estilos.cardAdminBox}>
            <Text style={estilos.textoDourado}>👑 Status da sua Conta:</Text>
            <Text style={{color: '#4CAF50', fontWeight: 'bold', marginTop: 4}}>Taxa Zero Ativa (Isento de Comissões)</Text>
          </View>

          <TouchableOpacity style={estilos.botaoVoltar} onPress={() => setTelaAtual('radar')}>
            <Text style={estilos.textoBotaoVoltar}>Salvar e Voltar ao Radar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  if (telaAtual === 'historico') {
    return (
      <View style={estilos.container}>
        <View style={estilos.headerHistorico}>
          <Text style={estilos.logoTitulo}>📅 MEU EXTRATO (ADMIN: 100% LÍQUIDO)</Text>
        </View>
        <ScrollView style={{ padding: 20 }}>
          {ganhosAdmin.map(item => (
            <View key={item.id} style={estilos.cardHistoricoDriver}>
              <Text style={estilos.dataItem}>📅 {item.data}</Text>
              <Text style={estilos.totalItem}>Valor Bruto: R$ {item.bruto.toFixed(2)}</Text>
              <Text style={{color: '#D4AF37'}}>Sua Taxa: {item.taxaAplicada}</Text>
              <Text style={{color: '#4CAF50', fontWeight: 'bold', marginTop: 4}}>Seu Lucro Líquido: R$ {item.liquido}</Text>
            </View>
          ))}
          <TouchableOpacity style={estilos.botaoVoltar} onPress={() => setTelaAtual('radar')}>
            <Text style={estilos.textoBotaoVoltar}>Voltar ao Radar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.fundoMapaSimulado}>
        <Text style={estilos.textoMapaSimulado}>🗺️ [ Radar Mestre - Rota Car Mestre ]</Text>
        
        {motoristasNoMapa.map(moto => (
          <View key={moto.id} style={[estilos.pinMotorista, { top: moto.y, left: moto.x }]}>
            <View style={estilos.bolinhaContador}>
              <Text style={estilos.textoContador}>{moto.corridas}</Text>
            </View>
            <Text style={estilos.iconeCarro}>🚗</Text>
            <Text style={estilos.nomeMotorista}>{moto.nome}</Text>
          </View>
        ))}
      </View>

      <View style={estilos.painelRodape}>
        <TouchableOpacity style={estilos.botaoAdminDourado} onPress={() => setTelaAtual('admin')}>
          <Text style={estilos.textoBotaoAdmin}>⚙️ Abrir Painel Admin (Preços e Taxas)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botaoHistoricoRodape} onPress={() => setTelaAtual('historico')}>
          <Text style={estilos.textoBotaoHistorico}>📅 Ver Meus Ganhos (Taxa Zero)</Text>
        </TouchableOpacity>

        <Text style={estilos.infoCorridasAtivas}>
          Corridas Simultâneas: <Text style={estilos.textoDourado}>{corridasAtuais} / 4</Text>
        </Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  fundoMapaSimulado: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#181A20', justifyContent: 'center', alignItems: 'center' },
  textoMapaSimulado: { color: '#666', fontSize: 14, fontWeight: 'bold', position: 'absolute', top: 130 },
  pinMotorista: { position: 'absolute', alignItems: 'center' },
  bolinhaContador: { position: 'absolute', top: -10, right: -10, backgroundColor: '#D4AF37', width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#121212', zIndex: 5 },
  textoContador: { color: '#121212', fontSize: 12, fontWeight: 'bold' },
  iconeCarro: { fontSize: 26 },
  nomeMotorista: { color: '#D4AF37', fontSize: 10, fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.8)', paddingHorizontal: 4, borderRadius: 3, marginTop: 2 },
  painelRodape: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: '#1E1E1E', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#333', alignItems: 'center' },
  infoCorridasAtivas: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginTop: 10 },
  headerHistorico: { marginTop: 50, paddingHorizontal: 20, marginBottom: 10, alignItems: 'center' },
  logoTitulo: { color: '#D4AF37', fontSize: 15, fontWeight: 'bold', letterSpacing: 1 },
  cardAdminBox: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  inputAdmin: { backgroundColor: '#121212', color: '#FFF', padding: 12, borderRadius: 8, marginTop: 8, marginBottom: 8, borderWidth: 1, borderColor: '#444' },
  cardHistoricoDriver: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  dataItem: { color: '#D4AF37', fontSize: 12, fontWeight: 'bold', marginBottom: 4 },
  totalItem: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  botaoVoltar: { backgroundColor: '#D4AF37', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 40 },
  textoBotaoVoltar: { color: '#121212', fontWeight: 'bold', fontSize: 15 },
  botaoAdminDourado: { backgroundColor: '#D4AF37', padding: 12, borderRadius: 8, alignItems: 'center', width: '100%', marginBottom: 8 },
  textoBotaoAdmin: { color: '#121212', fontWeight: 'bold', fontSize: 13 },
  botaoHistoricoRodape: { backgroundColor: '#252525', padding: 10, borderRadius: 8, alignItems: 'center', width: '100%', borderWidth: 1, borderColor: '#D4AF37', marginBottom: 5 },
  textoBotaoHistorico: { color: '#D4AF37', fontWeight: 'bold', fontSize: 13 },
  textoDourado: { color: '#D4AF37' },
  textoCinza: { color: '#888', fontSize: 12 },
});
