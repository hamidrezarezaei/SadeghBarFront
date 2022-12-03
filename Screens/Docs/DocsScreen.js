import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import DocsSingle from './DocsSingle';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import { Feather } from '@expo/vector-icons';
import UserContext from '../../Context/UserContext';
import Loading from '../../Component/Loading/Loading';
import { IsFreightageCurrentUser, IsProductOwnerCurrentUser } from '../../Util/UserUtils';

// =================================================================

export default function DocsScreen(props) {
  const context = useContext(UserContext);
  const [cartMelliUrl, setCartMelliUrl] = useState('https://docs.sadeghbar.com/Image/' + context.CurrentUser.id.toString() + '/CartMelli.jpg');
  const [javazUrl, setJavazUrl] = useState('https://docs.sadeghbar.com/Image/' + context.CurrentUser.id.toString() + '/Javaz.jpg');
  const [govahinamehUrl, setGovahinamehUrl] = useState('https://docs.sadeghbar.com/Image/' + context.CurrentUser.id.toString() + '/Govahinameh.jpg');
  const [cartMashinUrl, setCartMashinUrl] = useState('https://docs.sadeghbar.com/Image/' + context.CurrentUser.id.toString() + '/CartMashin.jpg');
  const [cartHushmandRanandehUrl, setCartHushmandRanandehUrl] = useState('https://docs.sadeghbar.com/Image/' + context.CurrentUser.id.toString() + '/CartHushmandRanandeh.jpg');
  const [cartHushmandMashinUrl, setCartHushmandMashinUrl] = useState('https://docs.sadeghbar.com/Image/' + context.CurrentUser.id.toString() + '/CartHushmandMashin.jpg');
  const [loading, setLoading] = useState(false);

  // =================================================================
  useEffect(() => {
    resetImages();
  }, []);
  // =================================================================
  const resetImages = () => {
    let RandomNumber = Math.floor(Math.random() * 10000) + 1;
    setCartMelliUrl('https://docs.sadeghbar.com/Image/' + context.CurrentUser.id.toString() + '/CartMelli.jpg?' + RandomNumber.toString());
    setJavazUrl('https://docs.sadeghbar.com/Image/' + context.CurrentUser.id.toString() + '/Javaz.jpg?' + RandomNumber.toString());
    setGovahinamehUrl('https://docs.sadeghbar.com/Image/' + context.CurrentUser.id.toString() + '/Govahinameh.jpg?' + RandomNumber.toString());
    setCartMashinUrl('https://docs.sadeghbar.com/Image/' + context.CurrentUser.id.toString() + '/CartMashin.jpg?' + RandomNumber.toString());
    setCartHushmandRanandehUrl('https://docs.sadeghbar.com/Image/' + context.CurrentUser.id.toString() + '/CartHushmandRanandeh.jpg?' + RandomNumber.toString());
    setCartHushmandMashinUrl('https://docs.sadeghbar.com/Image/' + context.CurrentUser.id.toString() + '/CartHushmandMashin.jpg?' + RandomNumber.toString());
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true} keyboardShouldPersistTaps={'handled'} >
        <View style={[globalStyles.screenContainer]}>
          {
            IsProductOwnerCurrentUser(context)?
            <>
              <DocsSingle docName={"CartMelli"} userId={context.CurrentUser.id} title={"تصویر کارت ملی"} imgUri={cartMelliUrl} resetImages={resetImages} setLoading={setLoading} />
              <DocsSingle docName={"Javaz"} userId={context.CurrentUser.id} title={"تصویر مجوز فعالیت"} imgUri={javazUrl} resetImages={resetImages} setLoading={setLoading} />
            </>
            : IsFreightageCurrentUser(context) ? 
            <>
              <DocsSingle docName={"CartMelli"} userId={context.CurrentUser.id} title={"تصویر کارت ملی"} imgUri={cartMelliUrl} resetImages={resetImages} setLoading={setLoading} />
              <DocsSingle docName={"Javaz"} userId={context.CurrentUser.id} title={"تصویر مجوز فعالیت"} imgUri={javazUrl} resetImages={resetImages} setLoading={setLoading} />
            </>
              :
              <>
                <DocsSingle docName={"Govahinameh"} userId={context.CurrentUser.id} title={"تصویر گواهی نامه"} imgUri={govahinamehUrl} resetImages={resetImages} setLoading={setLoading} />
                <DocsSingle docName={"CartMashin"} userId={context.CurrentUser.id} title={"تصویر کارت ماشین"} imgUri={cartMashinUrl} resetImages={resetImages} setLoading={setLoading} />
               
                {(context.CurrentUser.carTypeId != 1 && context.CurrentUser.carTypeId != 2 && context.CurrentUser.carTypeId != 3)?
                <>
                  <DocsSingle docName={"CartHushmandRanandeh"} userId={context.CurrentUser.id} title={"تصویر کارت هوشمند راننده"} imgUri={cartHushmandRanandehUrl} resetImages={resetImages} setLoading={setLoading} />
                  <DocsSingle docName={"CartHushmandMashin"} userId={context.CurrentUser.id} title={"تصویر کارت هوشمند ماشین"} imgUri={cartHushmandMashinUrl} resetImages={resetImages} setLoading={setLoading} />
                </>
                :
                <></>}
              </>
          }
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[globalStyles.backButton, { backgroundColor: '#6c757d' }]}
        onPress={() => props.navigation.goBack()}>
        <Feather name="arrow-right" size={30} color="white" />
      </TouchableOpacity>
      <Loading loading={loading} />

    </View>
  );
}