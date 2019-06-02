FROM nginx:stable

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
COPY ./wait-for-it.sh ./wait-for-it.sh
COPY ./entrypoint.sh ./entrypoint.sh

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

CMD [ "./entrypoint.sh" ]