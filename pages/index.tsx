import { createClient } from '@supabase/supabase-js';
import Gallery from '../components/Gallery';
import Hero from '../components/Hero';

export type ImageType = {
  id:number
  href:string
  imageSrc: string
  name: string
  username: string
}

const Home = ({images} : {images: ImageType[]}) => {
  
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <Hero/>
      <Gallery images={images}/>
    </div>
  )
}
export default Home;

export async function getStaticProps(){
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_ADMIN_KEY || '',
  )

  const {data} = await supabaseAdmin.from('images').select('*').order('id')
  return {
    props: {
      images:data
    }
  }
}
