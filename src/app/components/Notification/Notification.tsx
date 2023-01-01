import { NotificationType } from '@src/MicrositeWeather.constants';
import { INotificationProps } from '@src/MicrositeWeather.interface';

function Notification(props: INotificationProps) {
	const { type } = props;

	return (
		<div className="row">
			{type === NotificationType.error.value && 
				<div className="alert alert-error">{NotificationType.error.message}</div>
			}
		</div>
	)
}

export default Notification