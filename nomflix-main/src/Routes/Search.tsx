import { searchMovies, searchTvs } from "../api";
import { useLocation } from "react-router";
import { useQuery } from "react-query";
import styled from "styled-components";
import { makeImagePath ,makeNoImg} from "../utils";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import  { useEffect, useState } from "react"
import { useHistory, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  &.branch_0 {
  position: relative;
  top: -100px;
}
  &.branch_1 {
    margin-top:150px;
  }
`;


const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: any }>`
  background-color: purple;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigSearchData = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
  font-weight:400;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
const BranchTitle = styled.h2`
  padding:10px;
  margin-left:10px;
`

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};


const offset = 6;

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const {data : searchMovieData, isLoading : searchMovieLoading} = useQuery(["movies", "searchMovieData"], () => searchMovies(keyword));
    const {data : searchTvData, isLoading : searchTvLoading } = useQuery(["movies", "searchTvData"], () => searchTvs(keyword));
    const data = [searchMovieData, searchTvData]
    const isLoading = ( searchMovieLoading && searchTvLoading);
    const [branch, setbranch] = useState(0);
    const currentDataBranch = data[branch]
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const history = useHistory();
    const bigSearchDataMatch = useRouteMatch<{ searchDataId: string }>(`/search/:searchDataId`);
    const { scrollY } = useViewportScroll();
    const clickedSearchData = bigSearchDataMatch?.params.searchDataId && currentDataBranch?.results.find((searchData:any) => searchData.id === +bigSearchDataMatch.params.searchDataId);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onBoxClicked = (searchDataId: number, branch:number) => {
        history.push(`/search/${searchDataId}`);
        setbranch(branch)
      };
    
    // const onOverlayClick = () => history.push(`/search?keyword=${keyword}`);
    const onOverlayClick = () => history.goBack()
    const increseIndex = () => {
        if (currentDataBranch) {
            if (leaving) return;    
            toggleLeaving();
            const totalSearchDatas = currentDataBranch?.results.length - 1;
            const maxIndex = Math.floor(totalSearchDatas / offset);
            console.log(index, maxIndex);
            setIndex((prev) =>(prev === maxIndex ? 0 : prev + 1));
        }
    }
    return (
        <Wrapper  >
            
            {isLoading ? (<Loader>Loading</Loader>) : (
            <>
            {searchMovieData ? (<Banner
              onClick={increseIndex}
              bgPhoto={searchMovieData.results[0]?.backdrop_path ? makeImagePath(searchMovieData.results[0].backdrop_path, "w500") : makeNoImg}
            >
              <Title>{searchMovieData?.results[0]?.title}</Title>
              <Overview>{searchMovieData?.results[0].overview.slice(0,400)+"..."}</Overview>
            </Banner>): searchTvData ?
            <Banner
              onClick={increseIndex}
              bgPhoto={searchTvData?.results[0]?.backdrop_path ? makeImagePath(searchTvData?.results[0]?.backdrop_path, "w500") : makeNoImg}
            >
              <Title>{searchTvData?.results[0]?.name}</Title>
              <Overview>{searchTvData?.results[0]?.overview.slice(0,400)+"..."}</Overview>
            </Banner> : "Not Found"}
                 {[0, 1].map( i => ( 
               <>
                <Slider className={`branch_${i}`}>
                  <BranchTitle>
                    {i === 0 ? "Movies" : "TV Shows" }
                  </BranchTitle>
                <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
                    <Row variants={rowVariants} initial="hidden" animate="visible" exit="exit" transition={{ type: "tween", duration: 1 }} key={index}>
                    {data[i]?.results.slice(1).slice(offset * index, offset * index + offset).map((searchData:any) => (
                      
                        <Box key={searchData.id} bgPhoto={searchData.backdrop_path ? makeImagePath(searchData.backdrop_path, "w500") : makeNoImg}
                        whileHover="hover"
                        initial="normal"
                        layoutId={searchData.id+""}
                        variants={boxVariants}
                        onClick={() => onBoxClicked(searchData.id, i)}
                        >
                          
                      <Info variants={infoVariants}>
                        <h4>{searchData.title}</h4>
                      </Info>
                        </Box>
                        ))}
                    </Row>
                    </AnimatePresence>
                </Slider>
                </>))}
                <AnimatePresence>
                    {bigSearchDataMatch ? (
                    <>
                     <Overlay onClick={onOverlayClick} animate={{opacity: 1}} exit={{opacity: 0}}>
                     </Overlay>
                    <BigSearchData
                        style={{ top: scrollY.get() + 100 }}
                        layoutId={bigSearchDataMatch.params.searchDataId}>
                        {clickedSearchData && (
                        <>
                        {clickedSearchData.backdrop_path ? <BigCover
                            style={{backgroundImage: `linear-gradient(to top, black, transparent), 
                            url(${makeImagePath(clickedSearchData.backdrop_path,"w500")})`}}>
                        </BigCover> : <BigCover
                            style={{backgroundImage: `linear-gradient(to top, black, transparent), 
                            url(${makeNoImg})`}}>
                        </BigCover>}
                        <BigTitle>{clickedSearchData.title? clickedSearchData.title : clickedSearchData.name}</BigTitle>
                        <BigOverview>{clickedSearchData.overview.slice(0,400)+"..."}</BigOverview>
                        </>
                        )}
                    </BigSearchData> 
                    </>
                    ) : null}
                </AnimatePresence>
            </>)}
        </Wrapper>
    );
}

export default Search;
