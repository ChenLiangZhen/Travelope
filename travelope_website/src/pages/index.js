import Head from "next/head";
import Script from "next/script";
import {BaseGrid, BaseWeb} from "../components/Layouts";
import {SiteBody} from "../components/structured_components/Body";
import {SiteHeader} from "../components/structured_components/Header";
import SiteFooter from "../components/structured_components/Footer";

const App = () => {
   return (
      <>
         <Head>
            <title>Taiwan Weather 台灣天氣</title>
         </Head>

         <Script type='text/javascript'
                 src='//font.arphic.com/FontSubsetOutput/1642523883319/B2DF88D8BA84F2076780EDBB70B310FB/1642523883319.JS?9458856266'/>

         <BaseWeb>

            <BaseGrid>

               <SiteHeader info={() => {

               }}/>

               <SiteBody>

               </SiteBody>

               <SiteFooter/>
            </BaseGrid>
         </BaseWeb>
      </>
   )
}

export default App
