import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

const GET_MOVIE = gql`
	query getMovie($id: Int!) {
		getMovie(id: $id) {
			id
			title
			rating
			language
			rating
			medium_cover_image
			description_intro
			isLiked @client
		}
		getSuggestions(id: $id) {
			id
			medium_cover_image
		}
	}
`;
const Container = styled.div`
	height: 100vh;
	background-image: linear-gradient(-45deg, #d754ab, #fd723a);
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	color: white;
`;

const Column = styled.div`
	margin-left: 10px;
	width: 50%;
`;

const Title = styled.h1`
	font-size: 65px;
	margin-bottom: 15px;
`;

const Subtitle = styled.h4`
	font-size: 35px;
	margin-bottom: 10px;
`;

const Description = styled.p`
	font-size: 28px;
`;

const Poster = styled.div`
	width: 25%;
	height: 60%;
	background-color: transparent;
	background-image: url(${(props) => props.bg});
	background-size: cover;
	background-position: center center;
`;

function Detail() {
	const { id } = useParams();
	const { loading, data } = useQuery(GET_MOVIE, {
		variables: { id: Number(id) },
	});
	data && console.log(data);
	return (
		<Container>
			<Column>
				<Title>
					{loading
						? "Loading..."
						: `${data.getMovie.title} ${data.getMovie.isLiked ? "๐" : null}`}
				</Title>
				<Subtitle>
					{data?.getMovie?.language} ยท {data?.getMovie?.rating}
				</Subtitle>
				<Description>{data?.getMovie?.description_intro}</Description>
			</Column>
			<Poster bg={data?.getMovie?.medium_cover_image}></Poster>
			{/* {data?.getSuggestions?.map((m) => (
				<Movie key={m.id} id={m.id} bg={m.medium_cover_image} />
			))} */}
		</Container>
	);
}

export default Detail;
