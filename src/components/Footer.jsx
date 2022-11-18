import * as React from 'react'
import '../Footer.css'

const Footer = () => {
    return (
        // <Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
        //     <Stack spacing={{ base: '4', md: '5' }}>
        //         <Text fontSize="sm" color="subtle">
        //             &copy; {new Date().getFullYear()} Umesh Khatiwada. All rights reserved.
        //         </Text>
        //     </Stack>
        // </Container>
        <footer class="site-footer">
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-sm-6 col-xs-12">
                <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by
             <a href="https://github.com/umeshkhatiwada13"> Umesh Khatiwada</a>.
                </p>
              </div>
            </div>
          </div>
    </footer>

    )
}

export default Footer