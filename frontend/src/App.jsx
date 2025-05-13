import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import Navigation from './components/subComponents/navigation'
import Hero from './components/hero'
import BrowseCars from './components/navigation/lists'
import About from './components/navigation/About' 
import Enterdetail from './components/details/enterdetail'
import Policy from './components/details/policy'
import HelpAndSupport from './components/navigation/Help&Support'
import Footer from './components/footer'
const App = () => {

  return (
    <div>
        <BrowserRouter>
        {/* Your top navigation stays fixed across pages */}
        <Navigation />  
        {/* <Policy/> */}
        {/* <About/> */}
        <HelpAndSupport/>
        <Footer/>
        {/* Main content changes based on route */}
        {/* <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/browse" element={<BrowseCars />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes> */}
        {/* <Enterdetail/> */}
      </BrowserRouter>
    </div>
  )
}

export default App