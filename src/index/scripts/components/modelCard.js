import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import contentStyles from "IndexStyles/mainContent.scss";

export const ModelCard = props => (
	<Card className = {contentStyles.adaptiveCard} >
		<CardMedia
			component = "img"
			alt = { `Model ${props.model.name}` }

			image = { props.model.avatar }
			title = { `Model ${props.model.name}` }
		/>
		<CardContent>
			<Typography
				variant = "body2"
				color = "textSecondary"
				component = "p"
				align = "center"
				paragraph = { true }
			>
				{ props.model.id }
			</Typography>
			<Typography gutterBottom variant = "h5" component = "h2" align = "center">
				{ props.model.name }
			</Typography>
		</CardContent>
		<CardActions style={{justifyContent: `center`}}>
			<Button
				size = "medium"
				color = "primary"
				variant = "outlined"
				onClick = { () => props.handleClick(props.model.id) }
			>
				More Details
				<ChevronRightIcon />
			</Button>
		</CardActions>
	</Card>
);

ModelCard.propTypes = {
	model: PropTypes.object.isRequired,
	handleClick: PropTypes.func.isRequired
};
