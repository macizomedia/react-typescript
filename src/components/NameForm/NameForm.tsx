import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSubscribe } from '../../useAuth'

type Inputs = {
    email: string
    confirmEmail: string
    phone: string
}
interface ChildComponentProps {
    children:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined
    variant: any
    label: string /* other props for ChildComponent */
}
export interface IFormProps {
    children?: React.ReactNode
    onClick?: (e: any) => void
}

export const Form: React.SFC<ChildComponentProps> = ({
    children,
    variant,
    label,
}) => {
    const subscribeUser = useSubscribe()
    /* const subscribe = useCallback(
        (data) => {
            subscribeUser(data)
        },
        [subscribeUser],
    ) */
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<Inputs>({
        mode: 'onChange',
    })
    const onSubmit: SubmitHandler<Inputs> = (data, e) => {
        e?.target.reset() // reset after form submit
        subscribeUser(data)
    }

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '50vw',
            }}
        >
            <h3>{children}</h3>
            {/* register your input into the hook by invoking the "register" function */}
            <div className={`form__group field ${variant}`}>
                <input
                    className="form__field"
                    placeholder="888 888 8888"
                    defaultValue=""
                    {...register('email')}
                />
                <label className="form__label" htmlFor="email">
                    Email
                </label>
            </div>

            {/* include validation with required or other standard HTML validation rules */}
            <div className="form__group field">
                <input
                    className="form__field"
                    placeholder="888 888 8888"
                    {...register('confirmEmail', {
                        required: true,
                        validate: () =>
                            getValues('email') === getValues('confirmEmail'),
                    })}
                />
                <label className="form__label" htmlFor="confirmEmail">
                    Confirm Email
                </label>
                {/* errors will return when field validation fails  */}
                <div style={{ color: 'red' }}>
                    {errors.confirmEmail && (
                        <span>
                            <small>Emails don't Match</small>
                        </span>
                    )}
                </div>
            </div>
            <div className="form__group field">
                <input
                    className="form__field"
                    type="tel"
                    placeholder="888 888 8888"
                    {...register('phone', {
                        required: true,
                        maxLength: '12',
                        pattern: /[0-9]{3} [0-9]{3} [0-9]{4}/,
                    })}
                    title="Ten digits code"
                />
                <label className="form__label" htmlFor="phone">
                    Phone
                </label>

                <div style={{ color: 'red' }}>
                    {errors.phone && (
                        <span>
                            <small>Invalid Number</small>
                        </span>
                    )}
                </div>
            </div>
            <button className="btc" type="submit">
                {label}
            </button>
        </form>
    )
}
